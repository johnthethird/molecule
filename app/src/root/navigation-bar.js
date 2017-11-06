import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import semver from 'semver';

import HomeIcon from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import Paper from 'material-ui/Paper';
import RefreshIcon from 'material-ui-icons/Refresh';
import SettingsIcon from 'material-ui-icons/Settings';
import Tooltip from 'material-ui/Tooltip';
import SystemUpdateAltIcon from 'material-ui-icons/SystemUpdateAlt';

import connectComponent from '../helpers/connect-component';

import { open as openDialogPreferences } from '../state/dialogs/preferences/actions';

import {
  STRING_BACK,
  STRING_FORWARD,
  STRING_HOME,
  STRING_PREFERENCES,
  STRING_RELOAD,
  STRING_UPDATE_AVAILABLE,
} from '../constants/strings';

const styles = {
  container: {
    zIndex: 2,
    borderRadius: 0,
    display: 'flex',
    boxSizing: 'border-box',
    WebkitAppRegion: 'drag',
    WebkitUserSelect: 'none',
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    padding: '0 4px',
  },
  innerContainer: {
    alignItems: 'initial',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  innerContainerEnd: {
    flex: '0 0 auto',
    alignItems: 'flex-end',
  },
  iconButtonRoot: {
    height: 24,
    width: 24,
    margin: '20px auto 0 auto',
  },
  iconButtonIcon: {
    height: 32,
    width: 32,
  },
  hiddenMenuItem: {
    display: 'none',
  },
  menuItem: {
    cursor: 'pointer',
  },
  badge: {
    marginLeft: 12,
  },
};

const NavigationBar = (props) => {
  const {
    canGoBack,
    canGoForward,
    latestMoleculeVersion,
    classes,
    onBackButtonClick,
    onForwardButtonClick,
    onHomeButtonClick,
    onOpenDialogPreferences,
    onRefreshButtonClick,
    showTitleBar,
  } = props;

  const tooltipPlacement = 'bottom';

  // check for update
  const currentVersion = window.packageJson.version;
  const isLatestVersion = semver.gte(currentVersion, latestMoleculeVersion);

  return (
    <Paper
      elevation={2}
      className={classnames(
        classes.container,
        window.platform === 'darwin' && !showTitleBar && classes.containerWithoutTitlebar,
      )}
    >
      <div className={classes.innerContainer}>
        <Tooltip
          title={STRING_HOME}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={STRING_HOME}
            onClick={onHomeButtonClick}
          >
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={STRING_BACK}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={STRING_BACK}
            disabled={!canGoBack}
            onClick={onBackButtonClick}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={STRING_FORWARD}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={STRING_FORWARD}
            disabled={!canGoForward}
            onClick={onForwardButtonClick}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={STRING_RELOAD}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={STRING_RELOAD}
            onClick={onRefreshButtonClick}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className={classnames(classes.innerContainerEnd, classes.innerContainerEndVert)}>
        {!isLatestVersion ? (
          <Tooltip
            title={STRING_UPDATE_AVAILABLE}
            placement={tooltipPlacement}
          >
            <IconButton
              aria-label={STRING_UPDATE_AVAILABLE}
              color="accent"
            >
              <SystemUpdateAltIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        <Tooltip
          title={STRING_PREFERENCES}
          placement={tooltipPlacement}
        >
          <IconButton
            aria-label={STRING_PREFERENCES}
            onClick={() => onOpenDialogPreferences()}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Paper>
  );
};

NavigationBar.defaultProps = {
  canGoBack: false,
  canGoForward: false,
  latestMoleculeVersion: '1.0.0',
  showTitleBar: false,
};

NavigationBar.propTypes = {
  canGoBack: PropTypes.bool,
  canGoForward: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  latestMoleculeVersion: PropTypes.string,
  onBackButtonClick: PropTypes.func.isRequired,
  onForwardButtonClick: PropTypes.func.isRequired,
  onHomeButtonClick: PropTypes.func.isRequired,
  onOpenDialogPreferences: PropTypes.func.isRequired,
  onRefreshButtonClick: PropTypes.func.isRequired,
  showTitleBar: PropTypes.bool,
};

const mapStateToProps = state => ({
  canGoBack: state.nav.canGoBack,
  canGoForward: state.nav.canGoForward,
  latestMoleculeVersion: state.version.apiData.moleculeVersion,
  showTitleBar: state.preferences.showTitleBar,
});

const actionCreators = {
  openDialogPreferences,
};

export default connectComponent(
  NavigationBar,
  mapStateToProps,
  actionCreators,
  styles,
);
