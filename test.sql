SELECT * FROM `user` WHERE id = 0

SELECT * FROM `friends` WHERE one = 1 or two = 1

SELECT task.id, task.status, task.body FROM user, taskUser, task WHERE user.id = taskUser.userID and taskUser.taskID = task.id and user.id = 1

SELECT task.id, task.status, task.body FROM user, taskUser, task WHERE user.id = taskUser.userID and taskUser.taskID = task.id and user.id in (SELECT two FROM `friends` WHERE one = 1 or two = 1 UNION SELECT one FROM `friends` WHERE one = 1 or two = 1)

SELECT user.id, user.name, user.img, task.id, task.status, task.body FROM user, taskUser, task WHERE user.id = taskUser.userID and taskUser.taskID = task.id