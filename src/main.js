import { Observable } from 'rxjs/Observable'
const fruitsObservable = Observable.create(observe => {
  observe.next('apple')
  observe.next('orange')
  // observe.error(new Error('mistake'))
  setTimeout(() => {
    observe.next('lemon')
    observe.complete()
  }, 1000)
})
const fruitsObserver = {
  next: data => console.log(data),
  error: error => console.log(error.message),
  complete: () => console.log('done!')
}

console.log('----- before subscribe -----')
const fruitsSubscription = fruitsObservable.subscribe(fruitsObserver)
console.log('----- after subscribe -----')

setTimeout(() => {
  fruitsSubscription.unsubscribe()
}, 500)
