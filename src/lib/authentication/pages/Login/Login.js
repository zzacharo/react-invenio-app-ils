import { Notifications } from '@components/Notifications';
import { invenioConfig, uiConfig } from '@config';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Popup,
  Segment,
} from 'semantic-ui-react';
import { parseParams } from '@authentication/utils';
import { LoginWithLocalAccount } from './LoginWithLocalAccount';
import { LoginWithOauthProviders } from './LoginWithOauthProviders';

const LoginLayout = ({ backgroundImage, ...props }) => {
  const notImplementedPopup = (
    <Popup
      content="Not implemented yet!"
      trigger={
        <Link className="disabled" to="#">
          here
        </Link>
      }
    />
  );

  return (
    <Overridable id="Login.layout" backgroundImage={backgroundImage} {...props}>
      <>
        <Notifications />
        <div className="frontsite">
          <Container
            fluid
            className="auth-page blur"
            style={{
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : null,
            }}
          >
            <Container>
              <Image src={uiConfig.LOGO_SRC} size="small" centered />
              <Segment
                className="background-transparent pb-default pt-default"
                color="orange"
              >
                <Grid
                  stretched
                  verticalAlign="middle"
                  textAlign="center"
                  centered
                  columns={2}
                  padded
                >
                  <Grid.Row>
                    <Grid.Column
                      width={8}
                      textAlign="center"
                      only="tablet computer widescreen large screen"
                    >
                      <Grid
                        textAlign="center"
                        columns={2}
                        className="default-margin"
                      >
                        <Grid.Row>
                          <Grid.Column stretched width={8} textAlign="right">
                            <Header className="inline-block massive">
                              Hello!
                            </Header>
                          </Grid.Column>

                          <Grid.Column width={8} textAlign="left">
                            <Grid.Row>
                              <Grid.Column width={16}>
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Ciao!
                                </Header>{' '}
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Γεια σας!
                                </Header>{' '}
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Hej!
                                </Header>
                              </Grid.Column>
                              <Grid.Column>
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Cześć!
                                </Header>{' '}
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Salut!
                                </Header>{' '}
                                <Header
                                  as="h5"
                                  className="inline-block greetings"
                                >
                                  Alo!
                                </Header>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <p>
                        To sign in, choose your preferred method in the right
                        panel.
                      </p>
                      <Container className="spaced">
                        <Header as="h3">Sign up now</Header>
                        <p>
                          Don't have an account? Sign up {notImplementedPopup}
                        </p>
                      </Container>
                    </Grid.Column>
                    <Grid.Column
                      mobile={16}
                      tablet={8}
                      computer={8}
                      textAlign="center"
                    >
                      <Header as="h2" textAlign="center">
                        <Icon name="users" size="massive" />
                      </Header>
                      <p>Choose one of the options to sign in</p>
                      {invenioConfig.ENABLE_OAUTH_LOGIN && (
                        <LoginWithOauthProviders />
                      )}
                      {invenioConfig.ENABLE_LOCAL_ACCOUNT_LOGIN && (
                        <>
                          <Divider horizontal>Or</Divider>
                          <LoginWithLocalAccount />
                        </>
                      )}
                      <Container fluid>
                        <p>
                          Forgot your password? Recover {notImplementedPopup}.
                        </p>
                      </Container>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row only="mobile">
                    <Grid.Column width={16} textAlign="center">
                      <Divider />
                      <Container fluid className="spaced">
                        <Header as="h3">Sign up now</Header>
                        <p>
                          Don't have an account? Sign up {notImplementedPopup}
                        </p>
                      </Container>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Link className="alternative" to={FrontSiteRoutes.home}>
                  <Icon name="home" />
                  Home page
                </Link>
              </Segment>
            </Container>
          </Container>
        </div>
      </>
    </Overridable>
  );
};

class Login extends Component {
  componentDidMount() {
    this.showNotificationIfSessionExpired();
  }

  showNotificationIfSessionExpired = () => {
    const params = parseParams(window.location.search);
    const { sendErrorNotification } = this.props;
    if ('sessionExpired' in params) {
      sendErrorNotification(
        'Session Error',
        'You are either not signed in or your session has expired. Please sign in again.'
      );
    }
  };

  redirectIfAlreadyLoggedIn = () => {
    const { isLoading, isAnonymous, clearNotifications } = this.props;
    const params = parseParams(window.location.search);
    if (!isLoading && !isAnonymous) {
      if (!('sessionExpired' in params)) {
        clearNotifications();
        goTo(params.next || FrontSiteRoutes.home);
      }
    }
  };
  render() {
    this.redirectIfAlreadyLoggedIn();
    return <LoginLayout {...this.props} />;
  }
}

Login.propTypes = {
  backgroundImage: PropTypes.string,
  /* Redux */
  isLoading: PropTypes.bool.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
  user: PropTypes.object,
  sendErrorNotification: PropTypes.func.isRequired,
  clearNotifications: PropTypes.func.isRequired,
};

Login.defaultProps = {
  backgroundImage: null,
  user: {},
};

LoginLayout.propTypes = Login.propTypes;
LoginLayout.defaultProps = Login.defaultProps;

export default Overridable.component('LoginPage', Login);
