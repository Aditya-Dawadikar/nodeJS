const Note = require('../models/note.model.js');

//create adn save a note
exports.create=(req,res)=>{
	//validate request
	if(!req.body.content){
		return res.status(400).send({
			message:"Note content cannot be empty"
		});
	}

	//create a note
	const note = new Note({
		title: req.body.title || "Untitled Note",
		content: req.body.content
	});


	//save a note in database
	note.save()
	.then(data=>{
		res.send(data);
	}).catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while creating the note"
		});
	});

};

//retrieve and return all notes from the database
exports.findAll = (req,res)=>{
	Note.find()
	.then(notes=>{
		res.send(notes);
	}).catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while retrieving notes"
		});
	});
};

//retrieve and return a single note from the database
exports.findOne = (req,res)=>{
	Note.findById(req.params.noteId)

	.then(note=>{
		if(!note){
			return res.status(404).send({
				message:"Note not found with id" + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err=>{
		if(err.kind==='ObjectId'){
			return res.status(404).send({
				message:"Note not found with id" + req.param.noteId
			});
		}

		return res.status(500).send({
			message:"error retrieving note with id"+ req.params.notId
		});
	});
};

//update a note with particular noteId
exports.update = (req,res)=>{
	//validate a request
	if(!req.body.content){
		return res.status(400).send({
			message:"note cannot be empty"
		});
	}

	//find note and update it with the request body
	Note.findByIdAndUpdate(req.params.noteId,{
		title: req.body.title || "untitled note",
		content: req.body.content
	},{new:true})
	.then(note=>{
		if(!note){
			return res.status(404).send({
				message:"Note not found with Id" + req.params.noteId
			});
		}
		res.send(note);
	}).catch(err=>{
		if(err.kind==='ObjectId'){
			return res.status(404).send({
				message:"Note not found with id"+ req.params.noteId
			});
		}

		return res.status(500).send({
			message:"error updating note with id"+ req.params.noteId
		});
	});

};

//delete a note with particular noteId
exports.delete=(req,res)=>{
	Note.findByIdAndRemove(req.params.noteId)
	.then(note=>{
		if(!note){
			return res.status(404).send({
				message:"note not found with id" + req.params.noteId
			});
		}

		res.send({message:"Note deleted successfully !"});
	}).catch(err=>{
		if(err.kind==='objectId' || err.name === 'NotFound'){
			return res.status(404).send({
				message:"Note not found with Id"+ res.params.noteId
			});
		}

		return res.send(500).send({
			message:"could not delete node with id"+ req.params.noteId
		});
	});
};




















