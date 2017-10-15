var pool = require('./pool.js');

module.exports = {
	type(){
		var sql = "select * from tbl_exam_subjecttype";
		return pool.execute(sql);
	},
	level(){
		var sql = "select * from tbl_exam_subjectlevel";
		return pool.execute(sql);
	},
	department(){
		var sql = "select * from tbl_exam_epartment";
		return pool.execute(sql);
	},
	topic(){
		var sql = "select * from tbl_exam_topic";
		return pool.execute(sql);
	},
	showSubject(ids){
		var sql = "select * from tbl_exam_subject where department_id='"+ids[0]+"' and subjectLevel_id='"+ids[1]+"' and subjectType_id='"+ids[2]+"' and topic_id='"+ids[3]+"'";
		return pool.execute(sql);
	},
	showChoice(id){
		var sql = "select * from tbl_exam_choice where subject_id="+id;
		return pool.execute(sql);
	},
	checkedSubject(subject){
		var sql = "update tbl_exam_subject set checkState='"+subject.checkState+"' where id="+subject.id;
		return pool.execute(sql);
	},
	deleteSubject(id){
		var sql = "delete  from tbl_exam_subject where id="+id;
		return pool.execute(sql);
	},
	saveSubject(analysis,corretAnswer,checkState,stem,department,level,type,topic){
		var sql = "insert into tbl_exam_subject values(null,'"+analysis+"','"+corretAnswer+"','"+checkState+"','"+stem+"',null,'"+department+"','"+level+"','"+type+"','"+topic+"',null)";
		return pool.execute(sql);
	},
	saveChoiceContent(choiceContent,corretChoices,id){
		
   	       var sql = "insert into tbl_exam_choice values(null,'"+choiceContent+"','"+corretChoices+"','"+id+"')";
			return pool.execute(sql);
       		
	}

}