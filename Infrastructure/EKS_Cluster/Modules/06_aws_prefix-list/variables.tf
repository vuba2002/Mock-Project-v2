variable "jenkins_vpc_cidr" {
    description = "The CIDR block for the Jenkins VPC"
    type        = string
}
variable "eks_vpc_cidr" {
    description = "The CIDR block for the EKS VPC"
    type        = string
}
variable "ec2_vpc_cidr" {
    description = "Nat Gateway IP address"
    type        = string
}
variable "My_computer_ip" {
    description = "My computer IP address"
    type        = string
}
