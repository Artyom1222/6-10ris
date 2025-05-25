export class Tour {
  constructor({ title, description, isActive = true }) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.slug = Tour.createSlug(title);
    this.description = description;
    this.isActive = isActive;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static createSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }
}