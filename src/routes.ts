export type RouteType = {
  path: string,
  route: (...args: string[]) => string
}

const home: RouteType = {
  path: "/",
  route: () => "/"
}

const journey: RouteType = {
  path: "/journey/:journeyId",
  route: (journeyId) => `/journey/${journeyId}`
}

const newLeg: RouteType = {
  path: "/journey/:journeyId/newleg",
  route: (journeyId) => `/journey/${journeyId}/newleg`
}

export {
  home,
  journey,
  newLeg 
}