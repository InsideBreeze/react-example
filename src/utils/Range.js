class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  toString() {
    return `x | ${this.from} <= x <= ${this.to}`
  }

  [Symbol.iterator]() {
    let start = Math.ceil(this.from)
    let end = this.to
    return {
      [Symbol.iterator]() { return this },
      next() {
        return start <= end ? { value: start++, done: false } : { done: true }
      }
    }
  }
}

const r = new Range(1, 8)

function map(iteratable, fn) {
  const it = iteratable[Symbol.iterator]()

  return {
    [Symbol.iterator]() { return this },
    next() {
      const v = it.next()
      if (v.done) {
        return v
      } else {
        return { value: fn(v.value) }
      }
    }
  }
}

function filter(iteratable, predicate) {
  const it = iteratable[Symbol.iterator]()

  return {
    [Symbol.iterator]() { return this },
    next() {
      for (; ;) {
        const v = it.next()
        if (v.done || predicate(v.value)) {
          return v
        }
      }
    }
  }
}


console.log([...map(r, x => x * 2)])
console.log([...filter(r, x => x % 2 === 0)])
