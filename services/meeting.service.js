const fs = require('fs/promises');
const uuid = require('uuid');
const uuidv4 = uuid.v4;


const getData = async () => fs.readFile('./data/meetings.json').then(data => JSON.parse(data));
const updateData = async (data) => fs.writeFile('./data/meetings.json', JSON.stringify(data));


const addMeeting = async( typeOfService, Date, Time, NameOfUser,  PhoneOfUser, Note) => {
    const id = uuidv4();
    let meeting={};
    const meetings = await getData() || [];
    meeting.id = id;
    meeting.typeOfService = typeOfService;
    meeting.Date = Date;
    meeting.Time = Time;
    meeting.NameOfUser = NameOfUser;
    meeting.PhoneOfUser = PhoneOfUser;
    meeting.Note = Note;
    meetings.push(meeting);
    await updateData(meetings);
    return meeting;
}

const updateMeeting = async (id, meeting) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    Object.assign(_meeting, meeting);
    await updateData(meetings);
    return _meeting;
}

const getMeeting = async (id) => {
    const meetings = await getData();
    const _meeting = await meetings.find(m => m.id === id);
    return _meeting;
}

const getMeetings = async () => {
    const meetings = await getData();
    // const _meetings = await meetings.filter(m => m.businessId === businessId);
    return meetings;
}

const deleteMeeting = async (id) => {
    const meetings = await getData();5
    const index = await meetings.findIndex(m => m.id === id);
    meetings.splice(index, 1);
    await updateData(meetings);
}
module.exports = {
    addMeeting,
    deleteMeeting,
    updateMeeting,
    getMeeting,
    getMeetings,
}