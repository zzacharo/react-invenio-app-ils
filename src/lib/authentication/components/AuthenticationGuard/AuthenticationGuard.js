import { authenticationService } from '@authentication/services/AuthenticationService';
import { AuthenticationRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class AuthenticationGuard extends Component {
  render() {
    const {
      authorizedComponent: Authorized,
      unAuthorizedComponent: UnAuthorized,
      loginComponent: LoginComponent,
      roles,
      user,
      isAnonymous,
      isLoading,
      silent,
      ...restParams
    } = this.props;

    if (isLoading) {
      return null;
    }

    if (isAnonymous) {
      return LoginComponent ? (
        <LoginComponent />
      ) : (
        <Redirect
          to={AuthenticationRoutes.redirectAfterLogin(
            `${window.location.pathname}${window.location.search}`
          )}
        />
      );
    }

    if (!isAnonymous && !authenticationService.hasRoles(user, roles)) {
      if (!silent) {
        this.props.sendErrorNotification(
          'Unauthorized',
          `You have no permission to access the page ${window.location.pathname}`
        );
      }
      return UnAuthorized ? <UnAuthorized /> : null;
    }
    return <Authorized {...restParams} />;
  }
}

// set loginComponent prop to render conditionally depending on auth
AuthenticationGuard.propTypes = {
  authorizedComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  unAuthorizedComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  loginComponent: PropTypes.func,
  roles: PropTypes.array,
  silent: PropTypes.bool,
  /* Redux */
  user: PropTypes.object,
  isAnonymous: PropTypes.bool,
  isLoading: PropTypes.bool,
  sendErrorNotification: PropTypes.func.isRequired,
};

AuthenticationGuard.defaultProps = {
  roles: [],
  silent: false,
  unAuthorizedComponent: null,
  loginComponent: null,
};
