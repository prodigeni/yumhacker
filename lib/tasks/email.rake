namespace :email do
  desc 'Send daily email to users with new followers'
  task :new_followers => :environment do

    new_followed_users = User.includes(:followers).where('relationships.created_at > ? AND relationships.created_at <= ?', Time.now.midnight - 1.day + 6.hours, Time.now.midnight + 6.hours).references(:relationships)

    new_followed_users.each do |user| 
      UserMailer.new_followers(user).deliver
    end
  end
end
