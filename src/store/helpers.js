export default {
    getRate(currentRate, numOfCurrentReviews, newRate) {
        currentRate = currentRate || 0;
        return (currentRate * numOfCurrentReviews + newRate)/(numOfCurrentReviews + 1);
      },  
}