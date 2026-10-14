import apiClient from '../../services/apiClient'

/**
 * Creates a new enquiry for a program.
 *
 * @param {Object} enquiryData - Enquiry form data.
 * @returns {Promise} Axios response containing the created enquiry.
 */
export const createEnquiry = (enquiryData) => {
  return apiClient.post('/enquiries', enquiryData)
}

/**
 * Gets all enquiries belonging to the authenticated customer.
 *
 * @returns {Promise} Axios response containing the customer's enquiries.
 */
export const getMyEnquiries = () => {
  return apiClient.get('/enquiries/my')
}

/**
 * Gets a single enquiry belonging to the authenticated customer.
 *
 * @param {string} id - Enquiry ID.
 * @returns {Promise} Axios response containing the enquiry.
 */
export const getMyEnquiryById = (id) => {
  return apiClient.get(`/enquiries/my/${id}`)
}