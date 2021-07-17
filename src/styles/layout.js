import colors from './colors';

const layout = {
  /* pages */
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  roundedContent: function (size = 124) {
    return {
      borderRadius: size,
      width: size,
      height: size,
    };
  },
  /* components */
  imageEnlarge: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  headerBox: {
    width: '100%',
    height: 128,
    borderRadius: 128,
    backgroundColor: '#a388f8',
    transform: [{scaleX: 1.5}, {scaleY: 1}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  avatarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -64,
  },
  avatarPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostItem: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 8,
    borderBottomWidth: 0,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  simpleItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    marginLeft: 8,
    marginRight: 8,
  },
  avatarImage: {
    backgroundColor: '#a3e133',
    borderRadius: 114,
    width: 114,
    height: 114,
  },
  /* texts */
  avatarTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  avatarSubTitle: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  h1: {
    fontSize: 24,
    textAlign: 'center',
  },
  h2: {
    fontSize: 18,
    textAlign: 'center',
  },
  h3: {
    fontSize: 14,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 12,
  },
  /* Font sizes */
  fontSizeXXXL: {
    fontSize: 64,
  },
  fontSizeXXL: {
    fontSize: 48,
  },
  fontSizeXL: {
    fontSize: 32,
  },
  fontSizeL: {
    fontSize: 24,
  },
  fontSizeM: {
    fontSize: 18,
  },
  /* Font Colors */
  fontLight: {
    color: colors.light,
  },
};

export default layout;
