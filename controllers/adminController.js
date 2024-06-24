const mongoose = require('mongoose');
const Subject = require('../models/subject')
const Center = require('../models/center')
const Schedule = require('../models/schedule')
const section = require('../models/section');
//const level = require('../models/level');
const Lecture = require('../models/lecture');



const getRandomInt = (min, max) => {
  if (min > max) {
      throw new Error("Min should be less than or equal to Max");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};






async function generateschedule(req, res) {
  const level = parseInt(req.query.level, 10);
  const semester = parseInt(req.query.semester, 10);
  const major = req.query.major || '';

  console.log('Query parameters:', { level, semester, major });

  try {
      const subjects = await Subject.find({ level, semester });
      if (subjects.length === 0) {
          return res.status(404).json({ error: 'No subjects found for the given criteria.' });
      }

      const array = Array.from({ length: 6 }, () => Array(11).fill(0));
      const newSchedule = new Schedule({ name: `${level} ${semester}`, lectures: [], sections: [] });
      newSchedule.level = level
      newSchedule.semester = semester
      let counter = 0;
      const subjLen = subjects.length;
      let subjCounter = 0;
      const divide = Math.ceil(subjLen / 3);

      // First 3 days scheduling
      for (let i = 0; i < 3; i++) {
          let subjectsLenForDay = (counter + divide > subjLen) ? subjLen - counter : divide;
          console.log(subjectsLenForDay)
          counter += subjectsLenForDay;
          dayCount = 0
          for (let j = i; j < 9; j += 2) {
              if (j >= 9) break;

              const currSubject = subjects[subjCounter++];
              if (!currSubject) break;

              if (array[i][j] === 1) j++;

              const lecture = Lecture({
                  subject: currSubject._id,
                  row: i,
                  col: j,
              });

              newSchedule.lectures.push(lecture);
              dayCount++
              array[i][j] = 1;
              if(dayCount == subjectsLenForDay)
                break

          }
      }

      // Mirroring the first 3 days to the last 3 days
      for (let i = 3; i < 6; i++) {
          for (let j = 0; j < 9; j++) {
              if (array[i - 3][j] === 1) {
                  const foundLecture = newSchedule.lectures.find(lecture => lecture.row === i - 3 && lecture.col === j);
                  if (!foundLecture) continue; // Safety check

                  const currSubject = subjects.find(s => s._id.equals(foundLecture.subject));
                  if (!currSubject) continue; // Safety check

                  const lecture = Lecture({
                      subject: currSubject._id,
                      row: i,
                      col: j,
                  });

                  newSchedule.lectures.push(lecture);
                  array[i][j] = 1;
              }
          }
      }

      await newSchedule.save();
     
      res.status(200).json((await newSchedule));
  } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: err.message });
  }
}








// Generate Sections schedule Controller
async function generateSectionsschedule(req, res) {

  
  const level = parseInt(req.query.level, 10);
  const semester = parseInt(req.query.semester, 10);
  const centerName = req.query.centerName;
  const scheduleId = req.query.scheduleID
  console.log('Query parameters:', { level, semester, centerName,scheduleId});
  try {
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: 'schedule not found' });
    }

    const subjects = await Subject.find({ level, semester });
    const center = await Center.findOne({ center: centerName });
    const array = Array.from({ length: 6 }, () => Array(11).fill(0));

    // Mark existing lectures in the schedule
    schedule.lectures.forEach(lecture => {
      if (lecture.row !== undefined && lecture.col !== undefined) {
        array[lecture.row][lecture.col] = -1;
      } else {
        console.error('Invalid lecture:', lecture);
      }
    });
   console.log("1 passed")
    // Filter subjects to only include those with sections in rooms at the specified center
    const filteredsubjects = subjects.filter(subject => {
      return subject.sections.some(section => section.room.center.equals(center._id));
    });

    for (let i = 0; i < filteredsubjects.length; i++) {
      const subject = filteredsubjects[i];
      const studentsLength = subject.students.length;
      if(studentsLength ==0)
        res.status(404).json("not found students for subject : " + subject.name)
      let sectionsAvailableForsubject = Math.ceil(studentsLength / subject.sections[0].room.capacity);

      let min = 0;
      let remainingSections = 0;
      if (sectionsAvailableForsubject > 6) {
        remainingSections = sectionsAvailableForsubject - 6;
        min = 6;
      } else {
        remainingSections = 0;
        min = sectionsAvailableForsubject;
      }

      for (let row = 0; row < min; row++) {
        for (let col = 0; col < 11; col++) {
          let random = getRandomInt(0, 10);
          while (true) {
            if (array[row][random] == -1  ||array[row][random] == i) {
              random = getRandomInt(0, 10);
              continue;
            } else {
              break;
            }
          }
          if (array[row][random] == -1 ||array[row][random] == i) {
            continue;
          } else {
            section = subject.sections[0]
            section.row = row
            section.col = col
            schedule.sections.push(section);
            array[row][random] = i; // Mark this position as occupied
            break;
          }
        }
      }

      if (remainingSections !== 0) {
        for (let row = 0; row < remainingSections; row++) {
          for (let col = 0; col < 11; col++) {
            if (array[row][col] === -1 ||array[row][random] == i) {
              continue;
            } else {
                section.section = subject.sections[0]
                section.row = row
                section.col = col
                schedule.sections.push(section);
                array[row][random] = i; // Mark this position as occupied  array[row][col] = -1; // Mark this position as occupied
                break;
            }
          }
        }
      }
    }

    await schedule.save();
    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { generateschedule, generateSectionsschedule };
