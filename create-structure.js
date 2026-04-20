const fs = require('fs');
const path = require('path');

const folders = [
  'app/@modal/(.)notes/[id]',
  'app/(private routes)/notes/[id]',
  'app/(private routes)/notes/action/create',
  'app/(private routes)/notes/filter/@sidebar',
  'app/(private routes)/notes/filter/[...slug]',
  'app/api/notes/[id]',
  'app/(auth routes)/sign-in',
  'app/(auth routes)/sign-up',
  'app/(private routes)/profile/edit',
  'components/AuthNavigation',
  'components/AuthProvider',
  'components/Footer',
  'components/Header',
  'components/TanStackProvider',
  'lib/api',
  'lib/store',
  'types'
];

folders.forEach(folder => {
  const folderPath = path.join(process.cwd(), folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log('Created:', folder);
  }
});

console.log('Done!');
