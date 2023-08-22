module.exports = {
  format_date: (date) => {
    // Check if the date is valid
    if (!date) {
      return 'No Date';
    }
    // Format date as MM/DD/YYYY
    return new Date(date).toLocaleDateString();
  },
  format_amount: (amount) => {
    // Check if the amount is valid
    if (amount === null || amount === undefined) {
      return 'N/A';
    }
    // Format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
};





