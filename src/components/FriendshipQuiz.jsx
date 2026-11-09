
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const questions = [
  {
    question: 'What makes a friendship unforgettable?',
    options: [
      'Expensive gifts',
      'Random laughter and memories',
      'Perfect photographs',
      'Always agreeing'
    ],
    answer: 1,
    explanation: 'Exactly! It is the little moments that become the biggest memories.'
  },
  {
    question: 'What is the best plan between friends?',
    options: [
      'A perfectly planned schedule',
      'A spontaneous adventure',
      'Staying serious all day',
      'Never leaving home'
    ],
    answer: 1,
    explanation: 'The unplanned adventures often become the best stories.'
  },
  {
    question: 'What survives even after a silly argument?',
    options: [
      'The friendship',
      'The silence forever',
      'The argument score',
      'Nothing'
    ],
    answer: 0,
    explanation: 'A real friendship can laugh again after a difficult moment.'
  },
  {
    question: 'What should always be saved?',
    options: [
      'Only selfies',
      'Only chat screenshots',
      'Every little memory',
      'Nothing at all'
    ],
    answer: 2,
    explanation: 'Every little moment deserves a place in the memory book.'
  },
  {
    question: 'What is the secret ingredient of this friendship?',
    options: [
      'A little madness',
      'A lot of laughter',
      'Unforgettable memories',
      'All of the above'
    ],
    answer: 3,
    explanation: 'Correct! This friendship is a beautiful kind of chaos.'
  }
]

export default function FriendshipQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [finished, setFinished] = useState(false)

  const current = questions[questionIndex]
  const score = answers.filter((answer, index) => answer === questions[index].answer).length

  const choose = index => {
    if (answers[questionIndex] !== undefined) return

    const updated = [...answers]
    updated[questionIndex] = index
    setAnswers(updated)
  }

  const next = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true)
    } else {
      setQuestionIndex(value => value + 1)
    }
  }

  const restart = () => {
    setQuestionIndex(0)
    setAnswers([])
    setFinished(false)
  }

  return (
    <section id="friendship-quiz" className="bg-[#0c0b10] px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-amber-200/70">
          A little test of friendship
        </p>

        <h2 className="mt-5 font-serif text-4xl text-white sm:text-6xl">
          How well do you <span className="italic text-amber-200">know us?</span>
        </h2>

        <p className="mt-5 text-sm text-white/45">
          Five questions. One unforgettable friendship.
        </p>

        <div className="mt-12 rounded-2xl border border-amber-100/15 bg-white/[0.035] p-6 text-left shadow-2xl sm:p-10">
          {!finished ? (
            <>
              <div className="mb-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
                <span>Question {questionIndex + 1} / {questions.length}</span>
                <span>{Math.round((questionIndex / questions.length) * 100)}% completed</span>
              </div>

              <div className="mb-8 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-amber-200"
                  animate={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={questionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="font-serif text-2xl leading-relaxed text-white sm:text-3xl">
                    {current.question}
                  </h3>

                  <div className="mt-8 grid gap-3">
                    {current.options.map((option, index) => {
                      const chosen = answers[questionIndex] === index

                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => choose(index)}
                          className={`min-h-14 rounded-xl border px-5 py-4 text-left text-sm transition ${
                            chosen
                              ? 'border-amber-200 bg-amber-200/15 text-amber-100'
                              : 'border-white/10 bg-white/[0.025] text-white/65 hover:border-amber-200/40'
                          }`}
                        >
                          <span className="mr-3 text-amber-200/60">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          {option}
                        </button>
                      )
                    })}
                  </div>

                  {answers[questionIndex] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 rounded-lg bg-amber-100/[0.07] p-4 text-sm leading-6 text-amber-100/80"
                    >
                      {current.explanation}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                disabled={answers[questionIndex] === undefined}
                onClick={next}
                className="mt-8 min-h-12 w-full rounded-full bg-amber-200 px-6 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {questionIndex === questions.length - 1 ? 'See my result' : 'Next question →'}
              </button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="text-5xl">💛</div>
              <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-amber-200/70">
                Your friendship quiz result
              </p>
              <div className="mt-4 font-serif text-7xl text-amber-200">
                {score}/{questions.length}
              </div>
              <h3 className="mt-5 font-serif text-2xl text-white">
                {score === 5 ? 'Friendship expert!' : score >= 3 ? 'A beautiful connection!' : 'More memories to make!'}
              </h3>
              <p className="mt-3 text-sm text-white/50">
                The real score is all the memories you share.
              </p>
              <button
                type="button"
                onClick={restart}
                className="mt-8 min-h-12 rounded-full border border-amber-200/40 px-7 text-xs uppercase tracking-[0.2em] text-amber-100 hover:bg-amber-200 hover:text-black"
              >
                Play again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
