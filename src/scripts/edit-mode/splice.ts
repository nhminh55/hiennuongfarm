/**
 * Edit mode: changes one text value in a copy file (src/content/**\/*.md)
 * without touching the rest of the file. The value's YAML node is found
 * by its path and only its own characters are replaced, so every other
 * line, quote style, `\_` escape and comment stays byte for byte.
 */
import { isScalar, parseDocument, stringify, Scalar } from 'yaml';

export type Path = (string | number)[];

export class Conflict extends Error {}

const FRONTMATTER = /^(---\r?\n)([\s\S]*?\r?\n)(---(?:\r?\n|$))/;

/** The new value written in the style of the old one, on one line. */
const format = (value: string, type: Scalar['type']): string => {
  if (type === 'QUOTE_SINGLE' && !value.includes('\n')) return `'${value.replace(/'/g, "''")}'`;
  // Double quotes carry line breaks on one line; non-breaking spaces stay
  // written as `\_`, as elsewhere in the copy files.
  const quoted = () => JSON.stringify(value).replace(/ /g, '\\_');
  if (type === 'QUOTE_DOUBLE' || value.includes('\n')) return quoted();
  const plain = stringify(value, { lineWidth: 0 }).replace(/\n$/, '');
  return plain.includes('\n') ? quoted() : plain;
};

/**
 * Sets the text at `path` from `from` to `to` in a copy file's source.
 * Throws Conflict when the file no longer holds `from` there.
 */
export function setText(source: string, path: Path, from: string, to: string): string {
  const match = FRONTMATTER.exec(source);
  if (!match) throw new Error('Không tìm thấy phần đầu (frontmatter) của file');
  const offset = match[1].length;
  const doc = parseDocument(match[2]);
  if (doc.errors.length) throw new Error(doc.errors[0].message);
  const node = doc.getIn(path, true);
  if (!isScalar(node) || typeof node.value !== 'string' || !node.range) throw new Conflict('Không còn đoạn chữ này trong file');
  if (node.value !== from) throw new Conflict('Đoạn chữ này vừa được sửa ở nơi khác');
  const [start, end] = node.range;
  let text = format(to, node.type);
  // A block scalar's range runs through its final line break.
  if (match[2].slice(start, end).endsWith('\n') && !text.endsWith('\n')) text += '\n';
  return source.slice(0, offset + start) + text + source.slice(offset + end);
}

/** The text at `path` in a copy file's source, for checks. */
export function getText(source: string, path: Path): unknown {
  const match = FRONTMATTER.exec(source);
  return match ? parseDocument(match[2]).getIn(path) : undefined;
}
