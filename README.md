# Riddle Game - משחק חידות

פרויקט fullstack למשחק חידות עם שרת Node.js ולקוח web.

## מבנה הפרויקט

```
riddle_server/
├── server/          # Backend (Node.js)
│   ├── package.json
│   ├── app.js
│   ├── models/
│   ├── services/
│   ├── dal/
│   └── routes/
├── client/          # Frontend (HTML/CSS/JS)
│   └── package.json
└── data/           # קבצי נתונים
```

## התקנה והרצה

### שרת (Server)

```bash
# כניסה לתיקיית השרת
cd server

# התקנת תלויות
npm install

# הרצה במצב פיתוח (עם auto-reload)
npm run dev

# או הרצה רגילה
npm start
```

### לקוח (Client)

```bash
# כניסה לתיקיית הלקוח
cd client

# התקנת תלויות
npm install

# הרצת שרת פיתוח (יפתח בדפדפן בפורט 3000)
npm start

# או במצב פיתוח עם watch
npm run dev
```

## פונקציונליות

### שרת
- DAL (Data Access Layer) מאוחד עבור players ו-riddles
- ניהול נתוני שחקנים וחידות
- API endpoints לטיפול בנתונים

### לקוח
- ממשק משתמש לאינטראקציה עם החידות
- חיבור לשרת דרך HTTP requests

## כיצד להשתמש ב-DAL

```javascript
import dal from './dal/index.dal.js'

// גישה לנתוני שחקנים
const players = await dal.players.GetAll()
await dal.players.Write(newPlayersData)

// גישה לנתוני חידות  
const riddles = await dal.riddles.GetAll()
await dal.riddles.Write(newRiddlesData)
```

## הערות טכניות

- השרת משתמש ב-ES Modules (`type: "module"`)
- יש לוודא שכל הייבואים כוללים סיומת `.js`
- נתוני השחקנים והחידות נשמרים בקבצי טקסט בתיקיית הבסיס # Riddle-server
