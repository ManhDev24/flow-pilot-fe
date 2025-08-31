// 404 illustration from storyset.com
const illustration = 'https://storyset.com/images/404/8.svg'

function NotFound() {
  return (
    <div
      className='flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4'
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundAttachment: 'fixed',
        boxSizing: 'border-box'
      }}
    >
      <img
        src={illustration}
        alt='404 Not Found Illustration'
        style={{ maxWidth: 520, width: '100%'}}
      />

    <p className='text-blue-900 mb-10 text-center max-w-xl text-lg' style={{ wordBreak: 'break-word' }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <a
        href='/'
        className='px-8 py-4 rounded-xl text-white text-lg font-bold shadow transition'
        style={{ backgroundColor: '#0094FF', whiteSpace: 'nowrap', border: 'none', outline: 'none' }}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = '#0077CC')}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = '#0094FF')}
      >
        Back to Home
      </a>
    </div>
  )
}

export default NotFound
