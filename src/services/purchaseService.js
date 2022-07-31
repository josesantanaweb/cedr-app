import api from '../config/api'

const PurchaseServices = {
  purchase: async data => {
    const response = await api.post('purchase/', data)
    return response.data
  },
}

export default PurchaseServices
