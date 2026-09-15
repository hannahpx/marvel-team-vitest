import { useState } from 'react'
import './App.css'

import spiderManImage from './assets/heroes/spider-man.svg'
import ironManImage from './assets/heroes/iron-man.svg'
import thorImage from './assets/heroes/thor.svg'
import hulkImage from './assets/heroes/hulk.svg'
import blackWidowImage from './assets/heroes/black-widow.svg'
import captainAmericaImage from './assets/heroes/captain-america.svg'

const heroes = [
  {
    id: 'spider-man',
    name: 'Spider-Man',
    tagline: 'Web-slinger from Queens',
    image: spiderManImage,
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    tagline: 'Armoured tech specialist',
    image: ironManImage,
  },
  {
    id: 'thor',
    name: 'Thor',
    tagline: 'Asgardian warrior with the power of thunder',
    image: thorImage,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    tagline: 'Powered by incredible strength',
    image: hulkImage,
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    tagline: 'Spy and combat expert',
    image: blackWidowImage,
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    tagline: 'Super soldier and team leader',
    image: captainAmericaImage,
  },
]

const MAX_TEAM_SIZE = 3

function App() {
  const [selectedHeroes, setSelectedHeroes] = useState([])
  const [assembled, setAssembled] = useState(false)

  const isSelected = (heroId) =>
    selectedHeroes.some((hero) => hero.id === heroId)

  const toggleHero = (hero) => {
    if (isSelected(hero.id)) {
      setSelectedHeroes((current) =>
        current.filter((selectedHero) => selectedHero.id !== hero.id),
      )
      return
    }

    if (selectedHeroes.length < MAX_TEAM_SIZE) {
      setSelectedHeroes((current) => [...current, hero])
    }
  }

  const removeHero = (heroId) => {
    setSelectedHeroes((current) =>
      current.filter((hero) => hero.id !== heroId),
    )
  }

  const clearTeam = () => {
    setSelectedHeroes([])
  }

  const assembleTeam = () => {
    if (selectedHeroes.length === MAX_TEAM_SIZE) {
      setAssembled(true)
    }
  }

  const startAgain = () => {
    setSelectedHeroes([])
    setAssembled(false)
  }

  if (assembled) {
    return (
      <main className="app-shell">
        <section
          className="assembled-view"
          aria-labelledby="assembled-title"
        >
          <p className="kicker">Team assembled</p>

          <h1 id="assembled-title">Your Avengers team</h1>

          <div className="assembled-team">
            {selectedHeroes.map((hero) => (
              <article className="assembled-hero" key={hero.id}>
                <img
                  className="assembled-hero-image"
                  src={hero.image}
                  alt=""
                />
                <h2>{hero.name}</h2>
              </article>
            ))}
          </div>

          <button
            className="primary-button start-again-button"
            type="button"
            onClick={startAgain}
          >
            Start again
          </button>
        </section>

        <SiteFooter />
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="site-header">
        <p className="kicker">Marvel team builder</p>

        <div className="header-content">
          <h1>Avengers</h1>
          <p>Pick three heroes for your team.</p>
        </div>
      </header>

      <div className="builder-layout">
        <section
          className="hero-picker"
          aria-labelledby="hero-picker-title"
        >
          <div className="section-heading">
            <h2 id="hero-picker-title">Choose your heroes</h2>

            <p className="selection-count" aria-live="polite">
              {selectedHeroes.length} of {MAX_TEAM_SIZE} heroes selected
            </p>
          </div>

          <div className="hero-grid">
            {heroes.map((hero) => {
              const selected = isSelected(hero.id)
              const teamIsFull =
                selectedHeroes.length === MAX_TEAM_SIZE && !selected

              return (
                <button
                  className={`hero-card ${
                    selected ? 'selected' : ''
                  }`}
                  type="button"
                  key={hero.id}
                  onClick={() => toggleHero(hero)}
                  aria-pressed={selected}
                  disabled={teamIsFull}
                >
                  <img
                    className="hero-image"
                    src={hero.image}
                    alt=""
                  />

                  <span className="hero-card-body">
                    <span className="hero-card-copy">
                      <strong>{hero.name}</strong>
                      <span>{hero.tagline}</span>
                    </span>

                    <span
                      className="selection-indicator"
                      aria-hidden="true"
                    >
                      {selected ? '✓ Selected' : 'Select'}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <aside
          className="team-panel"
          aria-labelledby="team-title"
        >
          <div className="team-heading">
            <h2 id="team-title">Your team</h2>

            {selectedHeroes.length > 0 && (
              <button
                className="text-button"
                type="button"
                onClick={clearTeam}
              >
                Clear
              </button>
            )}
          </div>

          {selectedHeroes.length === 0 ? (
            <p className="empty-team">
              No heroes selected.
            </p>
          ) : (
            <ul className="selected-team">
              {selectedHeroes.map((hero) => (
                <li key={hero.id}>
                  <img
                    className="team-thumbnail"
                    src={hero.image}
                    alt=""
                  />

                  <span>{hero.name}</span>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => removeHero(hero.id)}
                    aria-label={`Remove ${hero.name} from team`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className="primary-button assemble-button"
            type="button"
            disabled={selectedHeroes.length !== MAX_TEAM_SIZE}
            onClick={assembleTeam}
          >
            Assemble
          </button>
        </aside>
      </div>

      <SiteFooter />
    </main>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      Built by{' '}
      <a
        href="https://github.com/hannahpx"
        target="_blank"
        rel="noreferrer"
      >
        Hannah
      </a>
    </footer>
  )
}

export default App