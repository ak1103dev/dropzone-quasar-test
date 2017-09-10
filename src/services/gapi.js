const CLIENT_ID = '904089928675-bhn16r2l298guobqrveh4qp6ps6di74p.apps.googleusercontent.com'
const API_KEY = 'AIzaSyAR52n9dgkDg2P99oWQfq7S8oCarFYy8Vs'
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
const SCOPES = 'https://www.googleapis.com/auth/drive'

const handleAuthClick = (event) => {
  gapi.auth2.getAuthInstance().signIn()
    .then((res) => {
      console.log('res', res)
      const token = res.Zi.access_token
      console.log('token', token)
      localStorage.setItem('googleToken', token)
    })
}

const handleSignoutClick = (event) => {
  gapi.auth2.getAuthInstance().signOut()
}

const listFiles = () => {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': 'nextPageToken, files(id, name)'
  }).then(function (response) {
    console.log('Files:')
    var files = response.result.files
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        console.log(file.name + ' (' + file.id + ')')
      }
    }
    else {
      console.log('No files found.')
    }
  })
}

const updateSigninStatus = (isSignedIn) => {
  console.log('is sign in', isSignedIn)
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    listFiles()
  }
  else {
    // authorizeButton.style.display = 'block';
    // signoutButton.style.display = 'none';
  }
}

const initClient = () => {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
    updateSigninStatus(isSignedIn)
  })
}

const handleClientLoad = () => {
  gapi.load('client:auth2', initClient)
}

export {
  handleClientLoad,
  handleAuthClick,
  handleSignoutClick
}
