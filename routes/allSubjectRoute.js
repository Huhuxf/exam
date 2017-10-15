var express = require('express');
var route = express.Router();
var allSubjectDB = require('../db/allSubjectDB');
var Subject = require('../modal/Subject');

route.get('/type',function(req,resp){
	allSubjectDB.type().then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.get('/level',function(req,resp){
	allSubjectDB.level().then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.get('/department',function(req,resp){
	allSubjectDB.department().then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.get('/topic',function(req,resp){
	allSubjectDB.topic().then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.post('/showSubject',function(req,resp){
	var queryInfo = req.body;
	console.log(queryInfo);
	var ids = [];
	 ids[2] = queryInfo['subject.subjectType.id'];
	 ids[1] = queryInfo['subject.subjectLevel.id'];
	 ids[0] = queryInfo['subject.department.id'];
	 ids[3] = queryInfo['subject.topic.id'];
	console.log(ids);
	allSubjectDB.showSubject(ids).then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.get('/showChoice',function(req,resp){
	var id = req.query.id;
	console.log(id);
	allSubjectDB.showChoice(id).then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});
});

route.post('/checkedSubject',function(req,resp){
	console.log(req.body);
	 var subject = new Subject();
     Object.assign(subject,req.body);
     console.log(subject);
	allSubjectDB.checkedSubject(subject).then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	});

});

route.post('/deleteSubject',function(req,resp){

	allSubjectDB.deleteSubject(req.body.id).then(function(data){
		resp.send(data);
	}).catch(function(err){
		resp.send(err);
	})
})

route.post('/saveSubject',function(req,resp){
	console.log(req.body);
	var subject =req.body;
	var analysis = subject['analysis'];
	var checkedState = subject['checkedState'];
	var stem = subject['stem'];
	var department = subject['department'];
	var level = subject['level'];
	var type = subject['type'];
	var topic = subject['topic'];
	var corretAnswer = subject['corretAnswer'];
	var choiceContent = subject['choiceContent[]'];
    var corretChoices=subject['corretChoices[]'];
    console.log(corretChoices);
    console.log(choiceContent);

	allSubjectDB.saveSubject(analysis,corretAnswer,checkedState,stem,department,level,type,topic).then(function(data){
		console.log(data);
		var id = data['insertId'];
		console.log(id);
		// resp.send(data);
		corretChoices.forEach(function(item,index){
            allSubjectDB.saveChoiceContent(choiceContent[index],item,id).then(function(data){
	            console.log(data);
	            resp.send(data);
            }).catch(function(err){
	            resp.send(err);
            });
        });
		
	}).catch(function(err){
		resp.send(err);
	})

    // allSubjectDB.saveChoiceContent(choiceContent,corretChoices,3).then(function(data){
		  // resp.send(data);
	   //  }).catch(function(err){
		  // resp.send(err);
	   //  });

     

	
	
})

module.exports = route;