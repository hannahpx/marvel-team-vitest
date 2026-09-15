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
    badge: 'SM',
    tagline: 'Web-slinger from Queens',
    image: spiderManImage,
  },
  {
    id: 'iron-man',
    name: 'Iron Man',
    badge: 'IM',
    tagline: 'Armoured tech specialist',
    image: ironManImage,
  },
  {
    id: 'thor',
    name: 'Thor',
    badge: 'TH',
    tagline: 'Asgardian warrior with the power of thunder',
    image: thorImage,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    badge: 'HK',
    tagline: 'Powered by incredible strength',
    image: hulkImage,
  },
  {
    id: 'black-widow',
    name: 'Black Widow',
    badge: 'BW',
    tagline: 'Spy and combat expert',
    image: blackWidowImage,
  },
  {
    id: 'captain-america',
    name: 'Captain America',
    badge: 'CA',
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
          className="assembled-panel"
          aria-labelledby="assembled-title"
        >
          <p className="eyebrow">Team assembled</p>

          <h1 id="assembled-title">Your Avengers team</h1>

          <p className="assembled-copy">
            Your three selected heroes are ready.
          </p>

          <div className="assembled-team">
            {selectedHeroes.map((hero) => (
              <article
                className={`assembled-hero ${hero.id}`}
                key={hero.id}
              >
                <span className="hero-badge" aria-hidden="true">
                  {hero.badge}
                </span>

                <h2>{hero.name}</h2>
              </article>
            ))}
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={startAgain}
          >
            Start again
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <header className="hero-header">
        <p className="eyebrow">Build your team</p>

        <h1>Avengers</h1>

        <p className="intro">
          Choose three heroes for your team.
        </p>
      </header>

      <div className="builder-layout">
        <section
          className="hero-picker"
          aria-labelledby="hero-picker-title"
        >
          <div className="section-heading">
            <div>
              <p className="step-label">Step 1</p>
              <h2 id="hero-picker-title">Choose your heroes</h2>
            </div>

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
                  className={`hero-card ${hero.id} ${
                    selected ? 'selected' : ''
                  }`}
                  type="button"
                  key={hero.id}
                  onClick={() => toggleHero(hero)}
                  aria-pressed={selected}
                  disabled={teamIsFull}
                >
                  {hero.image ? (
                    <img
                      className="hero-image"
                      src={hero.image}
                      alt=""
                    />
                  ) : (
                    <span className="hero-badge" aria-hidden="true">
                      {hero.badge}
                    </span>
                  )}

                  <span className="hero-card-copy">
                    <strong>{hero.name}</strong>
                    <span>{hero.tagline}</span>
                  </span>

                  <span
                    className="selection-indicator"
                    aria-hidden="true"
                  >
                    {selected ? '✓' : '+'}
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
          <div className="section-heading">
            <div>
              <p className="step-label">Step 2</p>
              <h2 id="team-title">Your team</h2>
            </div>

            {selectedHeroes.length > 0 && (
              <button
                className="text-button"
                type="button"
                onClick={clearTeam}
              >
                Clear team
              </button>
            )}
          </div>

          {selectedHeroes.length === 0 ? (
            <div className="empty-team">
              <span aria-hidden="true">A</span>

              <p>No heroes selected yet.</p>

              <small>
                Choose up to three heroes from the list.
              </small>
            </div>
          ) : (
            <ul className="selected-team">
              {selectedHeroes.map((hero) => (
                <li key={hero.id}>
                  <span
                    className={`mini-badge ${hero.id}`}
                    aria-hidden="true"
                  >
                    {hero.badge}
                  </span>

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

          <p className="assemble-hint">
            {selectedHeroes.length === MAX_TEAM_SIZE
              ? 'Your team is ready.'
              : `Choose ${
                  MAX_TEAM_SIZE - selectedHeroes.length
                } more hero${
                  MAX_TEAM_SIZE - selectedHeroes.length === 1
                    ? ''
                    : 'es'
                }.`}
          </p>
        </aside>
      </div>
    </main>
  )
}

export default App