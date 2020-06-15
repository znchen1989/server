const express = require('express');
const router = express.Router();

router.get('/vapidPublicKey', function(req, res, next) {
  res.send(process.env.VAPID_PUBLIC_KEY);
});

router.post('/register',  function(req, res, next) {
  res.sendStatus(201);
});
router.post('/sendNotification',  function(req, res, next) {
  const subscription = req.body.subscription;
  const payload = req.body.payload;
  const options = {
    TTL: req.body.ttl
  };
  setTimeout(function() {
    webPush.sendNotification(subscription, payload, options)
    .then(function() {
      res.sendStatus(201);
    })
    .catch(function(error) {
      console.log('-------notification error', error);
      res.sendStatus(500);
    });
  }, req.body.delay * 1000);
});

module.exports = router;
