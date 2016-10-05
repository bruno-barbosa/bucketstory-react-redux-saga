import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import md5 from 'md5'

const userSchema = new mongoose.Schema({
  profile: {
    picture         : { type: String },
    name            : { type: String },
    email           : { type: String },
    password        : { type: String },
    gender          : { type: String },
    location        : { type: String },
    website         : { type: String },
    role            : { type: String, default: 'user' }
  },
  social: {
    google          : { type: String },
    facebook        : { type: String },
    twitter         : { type: String }
  },
  tokens: {
    passResetToken  : { type: String },
    passResetExpire : { type: String },
    socialToken     : Array
  }
},
  {
    timestamps      : true
  }
)

userSchema.pre('save', function (next) {
  // TODO: Verify what this is
  if (!this.isModified('profile.password')) return next()
  bcrypt.hash(this.profile.password, 11, (err, hash) => {
    if (err) return err
    this.profile.password = hash
    next()
  })
})

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.profile.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

userSchema.methods.gravatar = function (email, size = 200) {
  email.trim().toLowerCase()
  if (!email) return `//gravatar.com/avatar/?s=${size}&d=retro`
  return `//gravatar.com/avatar/${md5(email)}?s=${size}&d=retro`
}

export default mongoose.model('User', userSchema)
