const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// get all members
router.get('/', (req, res) => {
    res.json(members);
});

//get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) res.json(members.filter(member => member.id === parseInt(req.params.id)));
    else res.status(400).json({ msg: `no member with the id:${req.params.id}` });
});

//create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'please include name and email' });
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

//update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                member.status = updateMember.status ? updateMember.status : member.status;
                res.json({ msg: 'Member is updated', member });
            }
        });
    }
    else res.status(400).json({ msg: `no member with the id:${req.params.id}` });
});

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'Member is deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({ msg: `no member with the id:${req.params.id}` });
    }
});

module.exports = router;