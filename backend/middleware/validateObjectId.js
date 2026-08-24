/**
 * Guards routes whose params are expected to be Mongo ObjectIds.
 *
 * Without this, a garbage id in the URL (e.g. /api/listings/category-trade from
 * a crawler) reaches Mongoose, throws a CastError, and the route's catch block
 * maps it to a 500. That is wrong twice over: it tells search engines the server
 * is broken when the truthful answer is "no such record", and it triggers a
 * false error alert.
 *
 * Note: mongoose.Types.ObjectId.isValid() returns true for ANY 12-character
 * string, so it can't be used to validate untrusted URL input. A real ObjectId
 * is exactly 24 hex characters.
 *
 * Usage:
 *   router.get('/:id', validateObjectId(), handler)              // checks :id
 *   router.get('/:listingId/x', validateObjectId('listingId'), handler)
 */

const OBJECT_ID_RE = /^[0-9a-fA-F]{24}$/;

function validateObjectId(...paramNames) {
  const names = paramNames.length ? paramNames : ['id'];

  return (req, res, next) => {
    for (const name of names) {
      const value = req.params[name];
      if (value !== undefined && !OBJECT_ID_RE.test(value)) {
        return res.status(404).json({ error: 'Not found' });
      }
    }
    next();
  };
}

module.exports = validateObjectId;
