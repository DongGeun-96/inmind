import sanitizeHtml from 'sanitize-html';

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'span', 'div',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'em', 'u', 's', 'b', 'i',
    'ul', 'ol', 'li',
    'a', 'img', 'blockquote', 'pre', 'code',
    'hr',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }),
  },
};

export function renderPostContent(content: string): string {
  if (!content) return '';
  const html = content.includes('<')
    ? content
    : content
        .split('\n')
        .map((line) => {
          const imageMatch = line.match(/\[이미지\]\((https?:\/\/.+?)\)/);
          if (imageMatch) return `<img src="${imageMatch[1]}" alt="첨부 이미지" />`;
          return `<p>${line || '&nbsp;'}</p>`;
        })
        .join('');
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}
