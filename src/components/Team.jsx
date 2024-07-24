import React from 'react';


const Team = () => {
  const teamMembers = [
    { name: 'Melvin Y. Adongo', role: 'Executive Director', imgSrc: 'img/about/melvin.jpeg', location:'Ghana' },
    { name: 'Otis K. Ledlum', role: 'Director of International Operations', imgSrc: 'img/about/otis.jpeg', location:'China' },
    { name: 'Vanessa E. Van-Dyke', role: 'Director of Communications', imgSrc: 'img/about/vanessa.jpeg', location:'Ghana' },
    { name: 'Percy N. Hansen', role: 'Logistics Manager', imgSrc: 'img/about/Nii.jpg', location:'Ghana' },
    { name: 'James K. Sekyi', role: 'Operations Manager', imgSrc: 'img/about/james.jpeg', location:'Ghana' },
    { name: 'Ebenezer Tseh', role: 'Software Engineer', imgSrc: 'img/about/Eben.png', location:'U.S.A'},
  ];

  return (
    <div className="container">
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
            <img src={member.imgSrc} alt={member.name} />
          </div>
          <h4>{member.name}</h4>
          <span>{member.role}</span>
          <p className='locat'>{member.location}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Team;
