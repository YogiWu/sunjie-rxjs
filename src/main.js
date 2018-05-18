import { Observable } from 'rxjs/Observable'
// import 'rxjs/add/observable/from'
import 'rxjs/add/observable/fromEvent'
// import 'rxjs/add/operator/throttleTime'
import 'rxjs/add/operator/debounceTime'

// -------------------以下是Observable

// const fruitsObservable = Observable.create(observe => {
//   observe.next('🍎')
//   observe.next('🍊')
//   // observe.error(new Error('mistake'))
//   setTimeout(() => {
//     observe.next('🍋')
//     observe.complete()
//   }, 1000)
// })
// const fruitsObserver = {
//   next: data => console.log(data),
//   error: error => console.log(error.message),
//   complete: () => console.log('done!')
// }

// console.log('----- before subscribe -----')
// const fruitsSubscription = fruitsObservable.subscribe(fruitsObserver)
// console.log('----- after subscribe -----')

// setTimeout(() => {
//   fruitsSubscription.unsubscribe()
// }, 500)

// -------------------以下是Operator
// Observable.from(['🍎', '🍊', '🍋']).subscribe(data => console.log(data))
Observable.fromEvent(document.getElementById('search'), 'keyup')
  .debounceTime(1000)
  .subscribe((data) => {
    console.log(data.key)
    console.log('searching...')
  })
