class MyPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = null
    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        this.resolvedCallbacks.forEach(fn => fn(value))
      }
    }

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.value = reason
        this.rejectedCallbacks.forEach(fn => fn(reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }


  then(onResolved, onRejected) {
    const onResolvedCallback = typeof onResolved === 'function' ? onResolved : (value) => value
    const onRejectedCallback = typeof onRejected === 'function' ? onRejected : (value) => { throw new Error(value) }


    return new Promise((resolve, reject) => {
      const handler = (value, callback) => {
        const result = callback(value)

        if (result instanceof MyPromise) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      }

      if (this.status === 'pending') {
        this.resolvedCallbacks.push(value => handler(value, onResolvedCallback))
        this.rejectedCallbacks.push(reason => handler(reason, onRejectedCallback))
      } else if (this.status === 'fulfilled') {
        handler(this.value, onResolvedCallback)
      } else {
        handler(this.status, onRejectedCallback)
      }
    })
  }
  static all(promises) {
    console.log(promises.length)
    return new MyPromise((resolve, reject) => {
      const resolvedValues = []
      let resolvedCount = 0
      try {
        promises.forEach((promise, index) => {
          promise.then(value => {
            resolvedValues[index] = value
            resolvedCount++

            if (resolvedCount === promises.length) {
              resolve(resolvedValues)
            }
          })
        })

      } catch (error) {
        reject(error)

      }
    })
  }
}


const promise = new MyPromise((resolve, _) => {
  setTimeout(() => resolve(0), 3000)
})


// promise.then(result => result)
//   .then(result => console.log(result))
// //
//
// promise.then(() => new Promise((resolve, _) => {
//   setTimeout(() => resolve('resolved again'), 3000)
// })).then(
//   result => console.log(result)
// )
//
const promise1 = new MyPromise((resolve, _) => {
  setTimeout(() => resolve(1), 3000)
})


const promise2 = new MyPromise((resolve, _) => {
  setTimeout(() => resolve(2), 3000)
})


const promise3 = new MyPromise((resolve, _) => {
  setTimeout(() => resolve(3), 3000)
})

const newPromise = MyPromise.all([promise, promise1, promise2, promise3])


newPromise.then(result => {
  result.forEach(value => console.log(value))
})

