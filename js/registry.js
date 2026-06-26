/**
 * LessonRegistry — must load BEFORE any lesson data files.
 * lesson01.js, lesson02.js etc. call LessonRegistry.add() on load,
 * so this object must already exist when they execute.
 */
window.LessonRegistry = {
  _list: [],
  add(lesson)  { this._list.push(lesson); },
  all()        { return [...this._list].sort((a, b) => a.id - b.id); },
  get(id)      { return this._list.find(l => l.id === id); }
};
