// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-ZA', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   })

// }
// export const formatStatus = (status) => {
//   const labels = {
//     pending: 'Pending',
//     paid: 'Paid',
//     failed: 'Failed',
//     cancelled: 'Cancelled',
//     refunded: 'Refunded',
//   }

//   return labels[status] || status
// }

// export const formatPrice = (amount) => {
//     return `R${Number(amount || 0).toFixed(2)}`
// }

// src/utils/helper.js

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const formatStatus = (status) => {
  const labels = {
    pending: 'Pending',
    paid: 'Paid',
    failed: 'Failed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
  }
  return labels[status] || status
}

const formatPrice = (amount) => {
  return `R${Number(amount || 0).toFixed(2)}`
}

export const format = {
  date: formatDate,
  status: formatStatus,
  price: formatPrice,
}


