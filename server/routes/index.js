var express = require('express');
var router = express.Router();
var db = require('../inMemoryDB/postMemoryDb');

// get issues
router.get('/issues', function(req, res, next) {
    res.json(db.list());
});

router.post('/addIssues', function(req, res, next) {
    db.add(req.body);
    res.json({"message": "successfully Added"});
});

router.post('/updateIssues', function(req, res, next) {
    db.update(req.body);
    res.json({"message": "successfully Updated"});
});

router.delete('/deleteIssues/:id', function(req, res, next) {
    db.remove(req.params.id);
    res.json({"message": "successfully Deleted"});
});

module.exports = router;