/* eslint-disable */

/**
 *
 * @returns {*}
 */
function getResults() {
  return this.http.post(this.baseUrl + '/search', this.query).then((data) => {
    return data;
  })
}
