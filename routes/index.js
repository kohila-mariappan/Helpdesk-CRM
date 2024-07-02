const express = require('express')
const app = express()
const userRoutes = require('./adminRoutes/users')
const projectRoutes = require('./helpdeskRoutes/projects')
const ticketRoutes = require('./helpdeskRoutes/Tickets')
const issueRoutes = require('./helpdeskRoutes/issue')
const moduleRoutes = require('./helpdeskRoutes/modules')
const commentRoutes = require('./helpdeskRoutes/comments')
const uploadRouts = require('./helpdeskRoutes/upload')
const logoRoutes = require('./adminRoutes/logo')
const adminRoutes = require('./adminRoutes/admin')


app.use('/user', userRoutes)
app.use('/projects',projectRoutes)
app.use('/create',projectRoutes)
app.use('/ticket',ticketRoutes)
app.use('/issue',issueRoutes)
app.use('/module',moduleRoutes)
app.use('/comments',commentRoutes)
app.use('/uploads',uploadRouts)
app.use('/logo',logoRoutes)
app.use('/admin',adminRoutes)

// Lead Routes
const LeadRoutes = require('./LeadRoutes/leads')
const ProductRoutes = require('./LeadRoutes/product')
//const LeadUserRoutes = require('./Leadusers')
const ConversationRoutes = require('./LeadRoutes/conversation')
const LeadCommentRoutes = require('./LeadRoutes/LeadComments')

app.use('/leads',LeadRoutes)
app.use('/products',ProductRoutes)
//app.use('/users',LeadUserRoutes)
app.use('/send',ConversationRoutes)
app.use('/comment',LeadCommentRoutes)

module.exports = app