// Для глобальних CSS файлів
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Для CSS модулів
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Для SCSS/SASS (якщо будете використовувати)
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}
