import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
  res.cookie('jwt',token,{
    maxAge: 15*24*60*60*1000,
    httpOnly: true, // to prevent XSS attack (cross site scripting)
    sameSite:"strict", // to prevent CSRF attack (cross site request forgery)
    secure:process.env.NODE_ENV === 'development' ? true : false
  })
}

export default generateTokenAndSetCookie;