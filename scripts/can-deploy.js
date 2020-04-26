/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const { failWithMessage } = require('./util');
const { gitBranch, checkIsCleanRepo } = require('./git');

/* CONSTANTS */
const DEPLOYMENT_BRANCH = 'dev';

/* Option parsing */
const commandArgs = process.argv.slice(2);

const COMMAND_OPTS = {
    DIRTY: '--dirty',
    CURRENT_BRANCH: '--current-branch'
};
function matchBooleanArg(opt) {
    return commandArgs.find(arg => arg === opt);
}
const canRunDirty = matchBooleanArg(COMMAND_OPTS.DIRTY);
const canRunCurrentBranch = matchBooleanArg(COMMAND_OPTS.CURRENT_BRANCH);

/* Main */
return Promise.all([gitBranch(), checkIsCleanRepo()]).then(([branch, isClean]) => {
    if (branch !== DEPLOYMENT_BRANCH && !canRunCurrentBranch) {
        failWithMessage(
            `You are trying to deploy from a branch other than ${DEPLOYMENT_BRANCH}. If you wish to do this, run with ${COMMAND_OPTS.CURRENT_BRANCH}`
        );
    }
    if (!isClean && !canRunDirty) {
        failWithMessage(
            `Your git working tree is dirty. Please commit your changes before deploying, or run with ${COMMAND_OPTS.DIRTY}`
        );
    }
    process.exit(0);
});
