import {message, danger} from 'danger';
export DANGER_GITHUB_API_TOKEN='xxxx';

const modifiedMD = danger.git.modified_files.join('- ');
message('Changed Files in this PR: \n - ' + modifiedMD);
