# vim:set filetype=ruby :

Vagrant.configure("2") do |config|

  # Box Config
  config.vm.box = "officialUbuntuSaucyServer64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/saucy/current/saucy-server-cloudimg-amd64-vagrant-disk1.box"

  # Box configs
  config.vm.provider "virtualbox" do |vb|
	  vb.customize [
		"modifyvm", :id,
		"--memory", "1024",
		"--cpus", "2"
	  ]
  end

  config.vm.provision :shell, :path => "provision.sh"

  # Synced Folder
  config.vm.synced_folder "..", "/usr/local/wombat", :mount_options => ["dmode=775", "fmode=775"]

  # Forward keys
  config.ssh.forward_agent = true
end
