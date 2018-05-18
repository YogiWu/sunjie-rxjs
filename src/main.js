import { Observable } from 'rxjs/Observable'
const fruitsObservable = Observable.create(observe => {
  observe.next('apple')
  observe.next('orange')
  observe.complete()
})
const fruitsObserver = {
  next: data => console.log(data),
  complete: () => console.log('done!')
}

fruitsObservable.subscribe(fruitsObserver)
