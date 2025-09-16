import React, { useEffect, useState } from 'react';
import { publicApiCall, apiConfig } from '../config/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: 'Mr James Adongo Asampua', role: 'Managing Director', imgSrc: 'img/about/james-adongo.jpeg', location: 'Ghana', fallbackImg: 'img/about/james.jpeg', imgStyle: { objectPosition: 'center top' } },
    { name: 'Melvin Y. Adongo', role: 'Director of Operations', imgSrc: 'img/about/melvin.jpeg', location: 'Ghana' },
    { name: 'Otis K. Ledlum', role: 'Director of International Operations', imgSrc: 'img/about/otis.jpeg', location: 'China' },
    { name: 'Jacob T. Tetteh', role: 'International Operations Manager', imgSrc: 'img/about/jacob.jpeg', location: 'China' },
    { name: 'Percy N. Hansen', role: 'Logistics Manager', imgSrc: 'img/about/Nii.jpg', location: 'Ghana' },
    { name: 'Ebenezer Tseh', role: 'Software Engineer', imgSrc: 'img/about/Eben.png', location: 'U.S.A' },
    { name: 'Peter Ossom', role: 'Marketing Manager', imgSrc: 'img/about/Peter.png', location: 'Ghana' },

  ]);
  const [partners, setPartners] = useState([
    { name: 'Mr Vitus Atanga Green', role: 'Strategic Partner', imgSrc: 'img/about/vitus.JPEG', location: 'USA' },
    { name: 'Mr Kelly Sugri Ayimbila', role: 'Strategic Partner', imgSrc: 'img/about/kelly.jpg', location: 'USA' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, partnersData] = await Promise.all([
          publicApiCall(apiConfig.endpoints.team).catch(() => null),
          publicApiCall(apiConfig.endpoints.partners).catch(() => null)
        ]);
        
        if (teamData && Array.isArray(teamData) && teamData.length) {
          setTeamMembers(teamData);
        }
        if (partnersData && Array.isArray(partnersData) && partnersData.length) {
          setPartners(partnersData);
        }
      } catch (_) {
        // Fail silently and keep defaults
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {/* Team Section */}
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Our Team</span>
            <h2>Meet Our Executive Members</h2>
          </div>
        </div>
      </div>
      <div className="team__grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team__item">
            <div className="team__img-wrapper">
              <img 
                src={member.imgSrc} 
                alt={member.name} 
                style={member.imgStyle}
                onError={(e) => {
                  if (member.fallbackImg) {
                    e.currentTarget.src = member.fallbackImg;
                    e.currentTarget.onerror = null;
                  }
                }}
              />
            </div>
            <h4>{member.name}</h4>
            <span>{member.role}</span>
            <p className='locat'>{member.location}</p>
          </div>
        ))}
      </div>

      {/* Partners Section */}
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Our Partners</span>
            <h2>Strategic Partners</h2>
          </div>
        </div>
      </div>
      <div className="team__grid">
        {partners.map((partner, index) => (
          <div key={index} className="team__item">
            <div className="team__img-wrapper">
              <img src={partner.imgSrc} alt={partner.name} />
            </div>
            <h4>{partner.name}</h4>
            <span>{partner.role}</span>
            <p className='locat'>{partner.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
