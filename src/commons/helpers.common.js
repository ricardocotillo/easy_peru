const capitalizeText = text => text.split(' ').map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(' ')

export { capitalizeText }