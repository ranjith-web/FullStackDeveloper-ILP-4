var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var _db = require('../inMemoryDB/postMemoryDb');

var db = mongoose.connection;


var myCollSchema = new mongoose.Schema({
    description: String,
    severity: String,
    status: String,
    created_date: String,
    resolved_date: String
  });
var issueCOLL = mongoose.model('issues', myCollSchema);

// get issues
router.get('/issues', function(req, res, next) {
    issueCOLL.find({}, function(err, _data){
        if(err) return console.log("got some error");
        else{
            var result = {"data": _data}
            res.json(result);
        }          
      })
    
});

router.post('/addIssues', function(req, res, next) {
    //_db.add(req.body);
    var newIssues = new issueCOLL();
    newIssues.description = req.body.description;
    newIssues.severity = req.body.severity;
    newIssues.status = req.body.status;
    newIssues.created_date = req.body.created_date;
    newIssues.resolved_date = req.body.resolved_date;

    newIssues.save(function(err, _issue){
        if(err) return console.log("got some error");
        else{
            console.log("added new Issues===>", _issue);
            res.json({"message": "successfully Added"});
        }
            
    })
});

router.put('/updateIssues', function(req, res, next) {
    //_db.update(req.body);
    issueCOLL.findOneAndUpdate({_id: req.body._id},
        { $set: 
            { 
                description : req.body.description,
                severity: req.body.severity,
                status: req.body.status,
                created_date: req.body.created_date,
                resolved_date: req.body.resolved_date
            }
        },
        {new: true},
        function(err, _issue){
            if(err) return console.log("got error while updation");
            else{
                res.json({"message": "successfully Updated"});
            }   
        }
    )
});

router.delete('/deleteIssues/:id', function(req, res, next) {
    issueCOLL.findByIdAndRemove({_id: req.params.id},
        function(err, _issue){
            if(err) res.send(err);
            else{
                res.json({"message": "successfully Deleted"});
            }   
        }
    )
});

module.exports = router;