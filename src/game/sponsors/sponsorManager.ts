import type {
  ActiveSponsorContract,
  Sponsor,
  SponsorTier,
} from "../../types/Sponsor";
import type { RealTeam } from "../../types/RealTeam";

export function getSponsorLimit(team: RealTeam) {
  if (team.reputation >= 92) {
    return 8;
  }

  if (team.reputation >= 80) {
    return 5;
  }

  if (team.reputation >= 62) {
    return 3;
  }

  return 2;
}

export function listAvailableSponsors(
  sponsors: Sponsor[],
  team: RealTeam,
  activeSponsors: ActiveSponsorContract[],
) {
  const activeIds = new Set(
    activeSponsors
      .filter((contract) => contract.teamId === team.id)
      .map((contract) => contract.sponsorId),
  );

  return sponsors.filter(
    (sponsor) =>
      !activeIds.has(sponsor.id) &&
      sponsor.reputationRequirement <= team.reputation &&
      sponsor.fanbaseRequirement <= team.fanbase,
  );
}

export function signSponsorContract(params: {
  sponsors: Sponsor[];
  teams: RealTeam[];
  activeSponsors: ActiveSponsorContract[];
  sponsorId: string;
  teamId: string;
}) {
  const sponsor = params.sponsors.find((item) => item.id === params.sponsorId);
  const team = params.teams.find((item) => item.id === params.teamId);

  if (!sponsor || !team) {
    return params;
  }

  const teamContracts = params.activeSponsors.filter(
    (contract) => contract.teamId === params.teamId,
  );

  if (teamContracts.length >= getSponsorLimit(team)) {
    return params;
  }

  if (
    sponsor.reputationRequirement > team.reputation ||
    sponsor.fanbaseRequirement > team.fanbase
  ) {
    return params;
  }

  const contract: ActiveSponsorContract = {
    sponsorId: sponsor.id,
    teamId: team.id,
    monthsRemaining: sponsor.contractMonths,
    signedAt: new Date().toISOString(),
    objectivesProgress: Object.fromEntries(
      sponsor.objectives.map((objective) => [objective.id, 0]),
    ),
  };

  return {
    ...params,
    teams: params.teams.map((candidate) =>
      candidate.id === team.id
        ? {
            ...candidate,
            budget: candidate.budget + sponsor.signingBonus,
            activeSponsors: [...candidate.activeSponsors, sponsor.id],
          }
        : candidate,
    ),
    activeSponsors: [...params.activeSponsors, contract],
  };
}

export function processMonthlySponsors(params: {
  sponsors: Sponsor[];
  teams: RealTeam[];
  activeSponsors: ActiveSponsorContract[];
}) {
  const sponsorById = new Map(params.sponsors.map((sponsor) => [sponsor.id, sponsor]));
  const paymentsByTeam = new Map<string, number>();
  const nextContracts = params.activeSponsors
    .map((contract) => {
      const sponsor = sponsorById.get(contract.sponsorId);
      if (!sponsor) {
        return contract;
      }

      paymentsByTeam.set(
        contract.teamId,
        (paymentsByTeam.get(contract.teamId) ?? 0) + sponsor.baseMonthlyPayment,
      );

      return {
        ...contract,
        monthsRemaining: contract.monthsRemaining - 1,
      };
    })
    .filter((contract) => contract.monthsRemaining > 0);

  return {
    teams: params.teams.map((team) => ({
      ...team,
      budget: team.budget + (paymentsByTeam.get(team.id) ?? 0),
      activeSponsors: team.activeSponsors.filter((sponsorId) =>
        nextContracts.some(
          (contract) => contract.teamId === team.id && contract.sponsorId === sponsorId,
        ),
      ),
    })),
    activeSponsors: nextContracts,
  };
}

export function applySponsorBonuses(params: {
  sponsors: Sponsor[];
  teams: RealTeam[];
  activeSponsors: ActiveSponsorContract[];
  teamId: string;
  event: "Win" | "Title" | "Playoff" | "Qualification" | "MajorQualification";
}) {
  const contracts = params.activeSponsors.filter(
    (contract) => contract.teamId === params.teamId,
  );
  const sponsorById = new Map(params.sponsors.map((sponsor) => [sponsor.id, sponsor]));
  const bonus = contracts.reduce((total, contract) => {
    const sponsor = sponsorById.get(contract.sponsorId);

    if (!sponsor) {
      return total;
    }

    if (params.event === "Win") {
      return total + sponsor.winBonus;
    }

    if (params.event === "Title") {
      return total + sponsor.titleBonus;
    }

    if (params.event === "Playoff") {
      return total + sponsor.playoffBonus;
    }

    if (params.event === "MajorQualification") {
      return total + sponsor.majorQualificationBonus;
    }

    return total + sponsor.tournamentQualificationBonus;
  }, 0);

  return {
    teams: params.teams.map((team) =>
      team.id === params.teamId ? { ...team, budget: team.budget + bonus } : team,
    ),
    bonus,
  };
}

export function terminateSponsorContract(params: {
  teams: RealTeam[];
  activeSponsors: ActiveSponsorContract[];
  sponsorId: string;
  teamId: string;
}) {
  return {
    teams: params.teams.map((team) =>
      team.id === params.teamId
        ? {
            ...team,
            activeSponsors: team.activeSponsors.filter((id) => id !== params.sponsorId),
          }
        : team,
    ),
    activeSponsors: params.activeSponsors.filter(
      (contract) =>
        contract.teamId !== params.teamId || contract.sponsorId !== params.sponsorId,
    ),
  };
}

export function renewSponsorContract(params: {
  sponsors: Sponsor[];
  activeSponsors: ActiveSponsorContract[];
  sponsorId: string;
  teamId: string;
}) {
  const sponsor = params.sponsors.find((item) => item.id === params.sponsorId);

  if (!sponsor) {
    return params.activeSponsors;
  }

  return params.activeSponsors.map((contract) =>
    contract.teamId === params.teamId && contract.sponsorId === params.sponsorId
      ? { ...contract, monthsRemaining: sponsor.contractMonths }
      : contract,
  );
}

export function sponsorTierWeight(tier: SponsorTier) {
  return {
    Local: 1,
    Regional: 2,
    National: 3,
    International: 4,
    Premium: 5,
  }[tier];
}
