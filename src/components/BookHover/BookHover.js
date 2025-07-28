import './BookHover.css'

export function BookHover({ title = '', reviewTitle = '', id = '', imageUrl = '' }) {
  const bookWrapper = document.createElement('div')
  bookWrapper.className = 'book-hover-wrapper'

  const bookImg = document.createElement('img')
  bookImg.className = 'book-hover-img'
  bookImg.src = imageUrl
  bookImg.alt = title
  bookImg.loading = 'lazy'

  const textWrapper = document.createElement('div')
  textWrapper.className = 'book-hover-text-wrapper'

  const bookTitle = document.createElement('h3')
  bookTitle.className = 'book-hover-title'
  bookTitle.textContent = title

  const review = document.createElement('p')
  review.className = 'book-hover-review'
  review.textContent = reviewTitle

  const reviewId = document.createElement('small')
  reviewId.className = 'book-hover-id'
  reviewId.textContent = id

  textWrapper.append(bookTitle, review, reviewId)
  bookWrapper.append(bookImg, textWrapper)

  return bookWrapper
}
