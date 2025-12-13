export const formatAmount = amount => {
    return Number(amount).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}